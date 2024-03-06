export const whileLoad = ({btnElement, isLoad}) => {
    if (isLoad) {
        btnElement.textContent = 'Сохранение...';
    }
    else {
        btnElement.textContent = 'Сохранить';
    }
}