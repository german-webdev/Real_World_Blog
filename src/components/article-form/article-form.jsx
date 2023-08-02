/* eslint-disable react/no-array-index-key */
/* eslint-disable dot-notation */
import { useState } from 'react';

import classes from './article-form.module.scss';

const ArticleForm = ({ formTitle, formik, submitted }) => {
  const [currentTagIndex, setCurrentTagIndex] = useState(-1);

  const handleTagChange = (e, index) => {
    formik.handleChange(e);
    setCurrentTagIndex(index);
  };

  return (
    <div className={classes['article-form']}>
      <h2 className={classes['article-form__title']}>{formTitle}</h2>

      <form onSubmit={formik.handleSubmit} className={classes['article-form__form']}>
        <label htmlFor="title" className={classes['article-title-label']}>
          <h3 className={classes['title']}>{`Title ${formik.values.title.length}/30`}</h3>
          <input
            maxLength="30"
            type="text"
            id="title"
            name="title"
            {...formik.getFieldProps('title')}
            className={`${classes['article-title-input']} ${
              formik.touched.title && formik.errors.title ? classes['inputs-error'] : ''
            }`}
            placeholder="Title"
          />
          {formik.touched.title && formik.errors.title && (
            <div className={classes['inputs-error-message']}>{formik.errors.title}</div>
          )}
        </label>

        <label htmlFor="description" className={classes['description-label']}>
          <h3 className={classes['title']}>{`Short description ${formik.values.description.length}/60`}</h3>
          <input
            maxLength="60"
            type="text"
            id="description"
            name="description"
            {...formik.getFieldProps('description')}
            className={`${classes['description-input']} ${
              formik.touched.description && formik.errors.description ? classes['inputs-error'] : ''
            }`}
            placeholder="Title"
          />
          {formik.touched.description && formik.errors.description && (
            <div className={classes['inputs-error-message']}>{formik.errors.description}</div>
          )}
        </label>

        <label htmlFor="text" className={classes['text-label']}>
          <h3 className={classes['title']}>{`Text ${formik.values.text.length}/3000`}</h3>
          <textarea
            maxLength="3000"
            id="text"
            {...formik.getFieldProps('text')}
            className={`${classes['textarea']} ${
              formik.touched.text && formik.errors.text ? classes['inputs-error'] : ''
            }`}
            cols="30"
            rows="7"
            placeholder="Text"
          />
          {formik.touched.text && formik.errors.text && (
            <div className={classes['inputs-error-message']}>{formik.errors.text}</div>
          )}
        </label>

        <div className={classes['tags-container']}>
          <ul className={classes['tags-list']}>
            {formik.values.tagList.map((tag, index) => (
              <li key={index} className={classes['tags-list__item']}>
                <label htmlFor={`tagList.${index}`} className={classes['tag-label']}>
                  {index === formik.values.tagList.length - 1 && (
                    <h3 className={classes['tags-container__title']}>
                      {`Tag ${
                        formik.values.tagList?.[currentTagIndex]?.length || formik.values.tagList?.[0]?.length || 0
                      }/10`}
                    </h3>
                  )}
                  <input
                    maxLength="10"
                    type="text"
                    id={`tagList.${index}`}
                    value={tag}
                    onChange={(e) => handleTagChange(e, index)}
                    onFocus={() => setCurrentTagIndex(index)}
                    className={`${classes['text-input']} 
                    ${formik.touched.tagList?.[index] && formik.errors.tagList?.[index] && classes['inputs-error']}`}
                    placeholder="Tag"
                  />
                  {formik.errors.tagList?.[index] && (
                    <div className={classes['inputs-error-message']}>{formik.errors.tagList[index]}</div>
                  )}
                </label>

                {index >= 0 && (
                  <button
                    type="button"
                    disabled={index === 0}
                    className={classes['delete-tag']}
                    onClick={() => {
                      const newTagList = [...formik.values.tagList];
                      newTagList.splice(index, 1);
                      formik.setFieldValue('tagList', newTagList);
                    }}
                  >
                    Delete
                  </button>
                )}

                {index === 0 ? (
                  <button
                    type="button"
                    className={classes['add-tag']}
                    onClick={() => {
                      const newTagList = ['', ...formik.values.tagList];
                      formik.setFieldValue('tagList', newTagList);
                    }}
                  >
                    Add tag
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <input type="submit" name="create" className={classes['submit']} value="Send" disabled={submitted} />
      </form>
    </div>
  );
};

export default ArticleForm;
