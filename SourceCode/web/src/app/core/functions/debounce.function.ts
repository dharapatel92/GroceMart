const DebounceFn = (callback: (...args: any[]) => void, wait: number, leading = false): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let leadingInvoked = false;

  return (...args: any[]) => {
    const invokeCallback = () => {
      callback.apply(null, args);
      leadingInvoked = false;
    };

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (leading && !leadingInvoked) {
      leadingInvoked = true;
      invokeCallback();
    }

    timeoutId = setTimeout(() => {
      if (timeoutId !== null) {
        invokeCallback();
      }
    }, wait);
  };
};
