export const LoadScript = (
  url: string,
  {
    loadType = 'defer',
    crossOrigin = false,
    integrity = '',
    target = 'body',
    id = ''
  }: {
    loadType?: 'async' | 'defer' | 'none';
    crossOrigin?: boolean;
    integrity?: string;
    target?: string;
    id?: string;
  } = {},
  callback?: () => void
) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.async = loadType === 'async';
  script.defer = loadType !== 'async' && loadType !== 'none';
  script.crossOrigin = crossOrigin ? 'anonymous' : null;
  script.integrity = integrity;
  script.id = id;

  const targetElement = document.querySelector(target) || document.body;
  const appendedElement = targetElement.appendChild(script);

  const onScriptLoad = () => {
    if (callback) callback();
  };

  appendedElement.addEventListener('load', onScriptLoad);
  appendedElement.addEventListener('error', onScriptLoad);
};
