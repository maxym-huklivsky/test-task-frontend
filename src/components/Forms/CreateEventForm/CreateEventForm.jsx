import React from 'react';
import { useForm } from 'react-hook-form';

import { MdTitle, MdDescription } from 'react-icons/md';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import css from '../Form.module.css';
import owncss from './CreateEventForm.module.css';
import { VscSaveAs } from 'react-icons/vsc';
import { createEvent, getAllEvents } from '../../../business-logic/events';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage } from '../../../redux/events/selectors';
import { setEvents } from '../../../redux/events/slice';
import toastifyError from '../../../helpers/toastifyError';
import { useParams } from 'react-router-dom';

const CreateEventForm = ({ setActive }) => {
  const { customerId } = useParams();

  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (e) => {
    try {
      await createEvent({ customerId, data: e });

      const { data } = await getAllEvents({ customerId, page });

      dispatch(setEvents(data));

      setActive(false);
      reset();
    } catch (error) {
      toastifyError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputWrap}>
        <input
          placeholder=""
          className={css.input}
          id="1"
          {...register('title', {
            required: { value: true, message: 'Это поле обязательное' },
            minLength: { value: 3, message: 'минимум 3 символа' },
            maxLength: { value: 26, message: 'максимум 26 символов' },
          })}
        />
        <label className={css.label} htmlFor="1">
          Title
        </label>

        {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        <MdTitle className={css.inputIcon} />
      </div>

      <div className={css.inputWrap}>
        <textarea
          placeholder=""
          className={`${css.input} ${owncss.textarea}`}
          id="2"
          {...register('description', {
            required: { value: true, message: 'Это поле обязательное' },
          })}
        ></textarea>
        <label className={css.label} htmlFor="2">
          Description
        </label>

        {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        <MdDescription className={css.inputIcon} />
      </div>

      <div className={css.inputWrap}>
        <label className={owncss.dateLabel} htmlFor="3">
          StartDate
        </label>
        <input
          type="datetime-local"
          className={owncss.datetimeInput}
          id="3"
          {...register('startDate', {
            required: { value: true, message: 'Это поле обязательное' },
          })}
        />

        {errors.startDate && <ErrorMessage>{errors.startDate.message}</ErrorMessage>}
      </div>

      <div className={css.inputWrap}>
        <label className={owncss.dateLabel} htmlFor="4">
          EndDate
        </label>
        <input
          type="datetime-local"
          className={owncss.datetimeInput}
          id="4"
          {...register('endDate', {
            required: { value: true, message: 'Это поле обязательное' },
          })}
        />

        {errors.endDate && <ErrorMessage>{errors.endDate.message}</ErrorMessage>}
      </div>

      <Button type="submit">
        <span>Сохранить</span> <VscSaveAs />
      </Button>
    </form>
  );
};

export default CreateEventForm;
