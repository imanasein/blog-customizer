// Импорт необходимых компонентов формы
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import {
	ArticleStateType, // Тип для состояния статьи
	fontFamilyOptions, // Опции для выбора шрифта
	fontSizeOptions, // Опции для выбора размера шрифта
	fontColors, // Опции для выбора цвета шрифта
	backgroundColors, // Опции для выбора цвета фона страницы
	contentWidthArr,
} from 'src/constants/articleProps'; //Опции для выбора ширины страницы

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

//===TO DO: Step 2===
// Форма редактирования свойств TO DO: Step 2
// КАК организована композиция (кого куда вложить)???
// Где хранить состояние???
// Как передавать данные между формой и страницей???
// Механика открытия/закрытия формы???
// Реализовать форму из имеющихся компонентов!!!

export type ArticleParamsFormProps = {
	initialParams: ArticleStateType; // Начальные параметры статьи, которые будут отображаться в форме при открытии
	onApply(params: ArticleStateType): void; // Функция обратного вызова, которая будет вызываться при применении изменений в форме. Она принимает объект с новыми параметрами статьи.
};

export const ArticleParamsForm = ({
	initialParams,
	onApply,
}: ArticleParamsFormProps) => {
	//======State формы Step 2.1======
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

	const [isOpen, setIsOpen] = useState(false); // Состояние для управления открытием/закрытием формы

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSubmit = (event: React.FormEvent) => {
		// Обработчик отправки формы на кнопку "Применить"
		event.preventDefault();
		onApply({
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		});
		console.log('Применить:', {
			fontFamilyOption,
			fontSizeOption,
			fontColor,
			backgroundColor,
			contentWidth,
		}); // ОТЛАДКА ПРОВЕРКА В КОНСОЛИ!!!!
	};

	const handleReset = () => {
		// Обработчик сброса формы на кнопку "Сбросить" Чтобы СБРОСИЛСЯ STATE
		setFontFamilyOption(initialParams.fontFamilyOption);
		setFontSizeOption(initialParams.fontSizeOption);
		setFontColor(initialParams.fontColor);
		setBackgroundColor(initialParams.backgroundColor);
		setContentWidth(initialParams.contentWidth);
		onApply(initialParams); // Вызываем функцию обратного вызова с начальными параметрами, чтобы сбросить состояние статьи
		console.log('Сброс состояния!'); // ОТЛАДКА ПРОВЕРКА В КОНСОЛИ!!!!
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />{' '}
			{/* Кнопка открытия/закрытия формы */}
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				{' '}
				{/* БЫЛО - styles.container*/}
				<form className={styles.form} onSubmit={handleSubmit}>
					{' '}
					{/* Добавили обработчик формы*/}
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
						<Button title='Сбросить' type='clear' onClick={handleReset} />{' '}
						{/* Кнопка сброса формы */}
						<Button title='Применить' htmlType='submit' type='apply' />{' '}
						{/*кнопка применения изменений */}
					</div>
				</form>
			</aside>
		</>
	);
};
