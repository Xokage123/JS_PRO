export const loadModule = async(value) => {
    const data =
        import (`../components/${value}`).catch(e => {
            alert('Данный модуль не был найден в папке компонентов')
        });

    return data;
}