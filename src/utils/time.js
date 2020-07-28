/**
 * 获取当前时间戳
 * @method getTimeStr 获取当前时间戳
 * @return {number}
 */
const getTimeStr = (data) => {
  return data ? new Date(data).getTime() : new Date().getTime();
};

export { getTimeStr }
