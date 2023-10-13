const formatVND = (money) => {
    if (money){
       return Number(money).toLocaleString('vi', { style: 'currency', currency: 'VND' });
    }
    return "";
}

export default formatVND
