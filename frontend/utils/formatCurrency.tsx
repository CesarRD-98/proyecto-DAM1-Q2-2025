export const formatCurrency = (value: number): string => {
    const formattedValue = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value)

    return formattedValue
}