export const navigateTo = (to: string) => {
  try {
    let offsetTop = document.getElementById(to)!.offsetTop;
    window.scrollTo({
      top: offsetTop - 100,
      behavior: "smooth",
    });
  } catch (e) {
    return;
  }
};
