import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './ArticleForm.module.scss';

function ArticleForm({ handlerSubmit, article }) {
  const [label, setLabel] = useState('');
  const [tags, setTags] = useState(article.tagList || []);
  const { handleSubmit, control, register } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });

  const addTag = () => {
    const isTag = tags.includes(label);
    if (!isTag) {
      setTags(() => [...tags, label]);
    
    }
    return setLabel('');
  };

  const removeTag = (tag) => {
    setTags([...tags].filter((item) => item !== tag));
  };

  const onSubmit = (data) => {
    const result = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: tags,
      },
    };
    handlerSubmit(result);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="title">
        Title
        <input
          className={styles.input}
          {...register('title', {
            required: 'Поле обязательно к заполнению',
          })}
          placeholder="Title"
          label="Title"
        />
      </label>
      <label className={styles.label} htmlFor="description">
        Short description
        <input
          className={styles.input}
          {...register('description', {
            required: 'Поле обязательно к заполнению',
          })}
          placeholder="Title"
        />
      </label>
      <label className={styles.label} htmlFor="body">
        Text
        <textarea
          className={styles.textarea}
          {...register('body', {
            required: 'Поле обязательно к заполнению',
          })}
          placeholder="Text"
        />
      </label>
      <div className={styles.label}>Tags</div>
      {tags
        ? tags.map((tag) => {
            const id = Date.now + Math.random() * 10;
            return (
              <div key={id} className={styles.tags}>
                <input value={tag} className={styles.tag} {...register(tag)} />
                <button className={styles.remove} type="button" onClick={() => removeTag(tag)}>
                  Delete
                </button>
              </div>
            );
          })
        : null}
      <div className={styles.tags}>
        <Controller
          render={() => (
            <input
              className={styles.tag}
              value={label}
              onChange={(e) => setLabel(e.target.value.trimStart())}
            />
          )}
          name="addField"
          control={control}
          defaultValue=""
        />
        <button onClick={removeTag} className={styles.remove} type="button">
          Delete
        </button>
        <button onClick={addTag} className={styles.add} type="button">
          Add tag
        </button>
      </div>
      <button className={styles.submit} type="submit">
        Send
      </button>
    </form>
  );
}

export default ArticleForm;