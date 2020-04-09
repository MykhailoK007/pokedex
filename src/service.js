

export const changeName = (name) => {
    if(name)
    return name.charAt(0).toUpperCase() + name.slice(1);
}