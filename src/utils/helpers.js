export const formatPrice = (number) => {
    return number
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if(type === 'igredients'){
        unique = unique.flat()
    }
    return [...new Set(unique)]
}
