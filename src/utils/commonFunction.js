/**
 * @flow
 * @description 日期时间转换年月日
 */
export const transformDate = dateTime => {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDate = year + '年' + month + '月' + day + '日';
  return newDate;
};
