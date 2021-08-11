export const formatPrice = (number) => {
    return number
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if(type === 'ingredients'){
        unique = unique.flat()
    }
    return ['all',...new Set(unique)]
}
