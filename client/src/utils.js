export const selectMapper = {
    true: (item, id) => item.id === id ? !item.commented : item.commented,
    false: (item, id) => item.id !== id
}

//export const url = 'http://boysthings.top:9999';
export const url = 'http://localhost:9999';