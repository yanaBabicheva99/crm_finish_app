export const getData = () => {
    const dateNow = new Date();
    let day: string | number = dateNow.getDate();
    let month: string | number = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return day + '.' + month + '.' + year;
};

export const getWeight = (weight: string) => {
    return weight + 'kg'
};

export function getPrice(amount: string) {
    const offset = 3;
    const price = amount.toString();

    let fmtPrice = '';

    if (price.length > offset) {
        let iter = 0;

        for (let count = price.length - 1; count >= 0; count--) {
            iter++
            switch (iter % offset) {
                case 1:
                    fmtPrice += ` ${price[count]}`;
                    continue

                default:
                    fmtPrice += price[count];
            }
        }

        return '$' + fmtPrice.split("").reverse().join("")

    } else {
        return  '$' + price
    }
}

