export const parsePhnNumber = (e) => {
  try {
    let value = e;
    if (parseInt(e)) {
      // eslint-disable-next-line
      value = value.replace(/\-/g, "");
      if (value.length > 3 && value.length <= 6)
        value = value.slice(0, 3) + "-" + value.slice(3);
      else if (value.length > 6)
        value =
          value.slice(0, 3) + "-" + value.slice(3, 6) + "-" + value.slice(6);
      return value.slice(0, 12);
    } else {
      return e;
    }
  } catch (error) {
    return e;
  }
};
