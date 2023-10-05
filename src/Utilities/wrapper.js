const wrapper = (promise, data) =>
  promise
    .then((res) => [res, null, data])
    .catch((err) => {
      return [null, err, data];
    });

export default wrapper;
