export const renderLoad = ({btnElement, isLoad}) => {
    if (isLoad) {
        btnElement.textContent = 'Сохранение...';
    }
    else {
        btnElement.textContent = 'Сохранить';
    }
}