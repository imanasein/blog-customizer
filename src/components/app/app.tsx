import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from './../../constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [appliedParams, setAppliedParams] = useState(defaultArticleState); // State для хранения параметров статьи (певоначальное состояние при рендере defaultArticleState)

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedParams.fontFamilyOption.value,
					'--font-size': appliedParams.fontSizeOption.value,
					'--font-color': appliedParams.fontColor.value,
					'--container-width': appliedParams.contentWidth.value,
					'--bg-color': appliedParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialParams={defaultArticleState} // Передаем начальные параметры статьи в форму
				onApply={setAppliedParams} // Передаем функцию обратного вызова для обновления примененных параметров статьи при изменении в форме
			/>
			<Article />
		</main>
	);
};
