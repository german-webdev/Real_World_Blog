import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { checkSubmitted } from '../../store/slices/main-slice';
import { createNewArticle, editArticle } from '../../store/slices/articles-slice';
import ArticleForm from '../article-form';

const WithArticleFormData = (props) => {
  const dispatch = useDispatch();
  const { article, slug, ...otherProps } = props;

  const articleFormik = useFormik({
    initialValues: {
      title: article?.title || '',
      description: article?.description || '',
      text: article?.body || '',
      tagList: article?.tagList || [''],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .matches(/^[^\s]+(?:$|.*[^\s]+$)/, 'Title must not start, end, or consist of only whitespace characters')
        .min(3, 'Title must be at least 3 characters')
        .max(40, 'Title must be less than 30 characters')
        .required('Title is required'),
      description: Yup.string()
        .matches(
          /^[^\s]+(?:$|.*[^\s]+$)/,
          'Short description must not start, end, or consist of only whitespace characters'
        )
        .min(3, 'Short description must be at least 3 characters')
        .max(60, 'Short description must be less than 60 characters')
        .required('Short description is required'),
      text: Yup.string()
        .min(3, 'Text must be at least 3 characters')
        .required('text is required')
        .max(3000, 'Text must be less than 3000 characters'),
      tagList: Yup.array().of(Yup.string().trim().required('tag is required')),
    }),
    onSubmit: (values) => {
      const data = {
        article: {
          title: values.title,
          description: values.description,
          body: values.text,
          tagList: values.tagList.map((el) => el.replace(/\s+/g, ' ').trim()),
        },
      };
      dispatch(checkSubmitted(true));

      if (article && slug) {
        dispatch(editArticle({ data, slug }));
      } else {
        dispatch(createNewArticle(data));
      }
    },
  });

  return <ArticleForm formik={articleFormik} {...otherProps} />;
};

export default WithArticleFormData;
