import { useEffect } from 'react';

type UseCloseOnOutsideClickOrEscProps = {
	isOpen: boolean;
	onClose: () => void;
	ref: React.RefObject<HTMLElement>;
};

export const useCloseOnOutsideClickOrEsc = ({
	isOpen,
	onClose,
	ref,
}: UseCloseOnOutsideClickOrEscProps) => {
	useEffect(() => {
		if (!isOpen) return; // Если форма закрыта, не добавляем обработчики

		const handleClickOutside = (event: MouseEvent) => {
			if (!ref.current?.contains(event.target as Node)) {
				onClose(); // Закрываем форму, если клик был вне её
			}
		};

		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				// Закрываем форму при нажатии клавиши Escape
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscKey);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isOpen, onClose, ref]);
};
