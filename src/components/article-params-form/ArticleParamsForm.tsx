import { useState, useRef } from 'react';
import clsx from 'clsx';
// Импорт необходимых компонентов формы
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { useCloseOnOutsideClickOrEsc } from './hooks/useCloseOnOutsideClickOrEsc';

import {
	ArticleStateType, // Тип для состояния статьи
	fontFamilyOptions, // Опции для выбора шрифта
	fontSizeOptions, // Опции для выбора размера шрифта
	fontColors, // Опции для выбора цвета шрифта
	backgroundColors, // Опции для выбора цвета фона страницы
	contentWidthArr,
} from 'src/constants/articleProps'; //Опции для выбора ширины страницы

import styles from './ArticleParamsForm.module.scss';

export type ArticleParamsFormProps = {
	initialParams: ArticleStateType; // Начальные параметры статьи, которые будут отображаться в форме при открытии
	onApply(params: ArticleStateType): void; // Функция обратного вызова, которая будет вызываться при применении изменений в форме. Она принимает объект с новыми параметрами статьи.
};

export const ArticleParamsForm = ({
	initialParams,
	onApply,
}: ArticleParamsFormProps) => {
	const [fontFamilyOption, setFontFamilyOption] = useState(
		initialParams.fontFamilyOption
	); // state опций выбора шрифта
	const [fontSizeOption, setFontSizeOption] = useState(
		initialParams.fontSizeOption
	); // state опций выбора размера шрифта
	const [fontColor, setFontColor] = useState(initialParams.fontColor); // state опций выбора цвета шрифта
	const [backgroundColor, setBackgroundColor] = useState(
		initialParams.backgroundColor
	); // state опций выбора цвета фона страницы
	const [contentWidth, setContentWidth] = useState(initialParams.contentWidth); // state опций выбора ширины страницы

	const [isFormOpen, setIsFormOpen] = useState(false); // Состояние для управления открытием/закрытием формы

	const handleToggle = () => {
		setIsFormOpen((prev) => !prev);
	};

	const asideRef = useRef<HTMLElement | null>(null); // Реф для отслеживания кликов вне формы

	useCloseOnOutsideClickOrEsc({
		// Хук для закрытия формы при клике вне её или при нажатии клавиши Escape
		isOpen: isFormOpen,
		onClose: () => setIsFormOpen(false),
		ref: asideRef,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	const handleReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // отмена стандартного поведения формы при сбросе
		setFontFamilyOption(initialParams.fontFamilyOption);
		setFontSizeOption(initialParams.fontSizeOption);
		setFontColor(initialParams.fontColor);
		setBackgroundColor(initialParams.backgroundColor);
		setContentWidth(initialParams.contentWidth);
		onApply(initialParams); // Вызываем функцию обратного вызова с начальными параметрами, чтобы сбросить состояние статьи
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggle} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select /* Компонент выпадающего списка для выбора шрифта */
						selected={fontFamilyOption}
						onChange={setFontFamilyOption}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup /* Компонент радиогруппы для выбора размера шрифта */
						selected={fontSizeOption}
						name='fontSize'
						onChange={setFontSizeOption}
						options={fontSizeOptions}
						title='РАЗМЕР ШРИФТА'
					/>
					<Select /* Компонент выпадающего списка для выбора цвета шрифта*/
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator /> {/* Разделитель */}
					<Select /* Компонент выпадающего списка для выбора цвета фона страницы*/
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select /* Компонент выпадающего списка для выбора ширины страницы*/
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' htmlType='reset' />
						{/* Кнопка сброса формы */}
						<Button title='Применить' htmlType='submit' type='apply' />
						{/*кнопка применения изменений */}
					</div>
				</form>
			</aside>
		</>
	);
};
