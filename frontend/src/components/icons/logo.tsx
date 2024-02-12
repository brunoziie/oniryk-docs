export default function IconLogo({
  animate,
  ...props
}: React.SVGProps<SVGSVGElement> & { animate?: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="171.968"
      height="174.399"
      viewBox="0 0 171.968 174.399"
      fill="none"
      {...props}
    >
      <g fill="currentColor">
        <g className={animate ? 'animate-spin-slow origin-center' : ''}>
          <path d="M79.868.175c-23.6 2-43.8 12.6-59.6 31.2-7.2 8.3-15.3 23.6-18 33.6-2.2 8.1-3 29.4-1.5 38.1 3 17 9.9 30.6 22 43.6 11.5 12.3 23.6 20.1 38.6 24.8 10 3.1 29.2 3.9 40.6 1.6 41.2-8.4 70.1-43.4 70-85 0-34.8-19.7-65.7-51.3-80.6-10.3-4.9-29.3-8.3-40.8-7.3zm7.8 11c.4 2.4-2.6 4-3.4 1.8-.8-2.1.3-4.7 1.9-4.3.6.3 1.3 1.4 1.5 2.5zm-27.8 8.4c0 .5-.7.9-1.5.9-1.5 0-2-1.2-.9-2.3.8-.8 2.4.1 2.4 1.4zm55-.6c0 .8-.7 1.5-1.5 1.5-1.6 0-2-1.2-.8-2.3 1.1-1.2 2.3-.8 2.3.8zm-44 2.5c0 1.1-.7 2-1.5 2-1.5 0-2.1-2.1-.8-3.3 1.2-1.3 2.3-.7 2.3 1.3zm32.6-.9c.8 1.4-1.8 3.1-3 1.9-.9-.9 0-3 1.4-3 .5 0 1.2.5 1.6 1.1zm-54.6 3.4c0 .8-.4 1.5-1 1.5-.5 0-1-.7-1-1.5s.5-1.5 1-1.5c.6 0 1 .7 1 1.5zm76-.6c0 .6-.4 1.3-1 1.6-.5.3-1-.1-1-.9 0-.9.5-1.6 1-1.6.6 0 1 .4 1 .9zm-36.4 3.5c.3 1.5 1.5 2.7 3 3 3.2.9 3 2.2-.5 2.9-3.4.7-4.1 2.6-4.1 11.9 0 3.9-.4 6.8-1 6.8s-1-3.1-1-7.4c0-8.5-.6-10.6-2.9-10.6-.9 0-2.2-.4-3-.9-1.1-.7-.7-1.3 1.6-2.5 1.7-.8 3.3-2.4 3.6-3.6.7-2.8 3.5-2.5 4.3.4zm-28.6 3.1c0 1.6-2.7 2.7-3.6 1.4-.3-.5-.3-1.6 0-2.4.6-1.7 3.6-.9 3.6 1zm55.8-.2c.2 1.2-.3 1.7-1.7 1.7-1.2 0-2.1-.6-2.1-1.3 0-3.1 3.2-3.4 3.8-.4zm-71.8 1.2c0 .8-.4 1.5-1 1.5-.5 0-1-.7-1-1.5s.5-1.5 1-1.5c.6 0 1 .7 1 1.5zm85.1.8c-1.3 1.3-2.6.3-1.6-1.2.3-.6 1.1-.8 1.7-.5.6.4.6 1-.1 1.7zm-96.3 3.9c-.6 1.8-2.8 2.1-2.8.4 0-.9.7-1.6 1.6-1.6.9 0 1.4.5 1.2 1.2zm110 0c-.3.7-1.1 1.3-1.8 1.3s-1.5-.6-1.7-1.3c-.3-.7.4-1.2 1.7-1.2 1.3 0 2 .5 1.8 1.2zm-65.1 4.5c.2.6-1.1 1.3-3 1.7-1.8.3-7 2.4-11.5 4.6-4.5 2.1-8.4 3.5-8.6 3.1-1.2-1.9 8.3-7.4 16.4-9.7 5-1.3 6.2-1.3 6.7.3zm29.5 2.4c6.2 3.1 9.9 5.9 9.3 7-.3.5-2.9-.4-5.8-2s-7.7-3.7-10.7-4.7c-7.7-2.4-8.8-3.8-2.3-3.1 2.8.3 7.1 1.6 9.5 2.8zm-69.4 1.1c.9.9 1.8.9 3.8-.1 3.3-1.5 3.7-1.1 2.4 2.4-.8 2-.7 3.1.1 4.2.9 1.1.8 1.7-.7 2.7-1.2 1-2.3 1.1-3.1.5-.6-.6-2.3-.7-3.7-.3-2.6.6-3.6-.8-1.5-2.2.7-.4.9-2.1.5-4.5-.6-4 .1-4.8 2.2-2.7zm96.1-.2c3-1.5 3.2-1.3 2.5 2.9-.4 2.4-.2 4.1.5 4.5 1.9 1.2 1.2 2.8-1.1 2.5-1.3-.2-2.8 0-3.5.4-.6.4-2.3.2-3.7-.4-2-1-2.3-1.5-1.5-2.6.6-.7.9-2.6.6-4.2-.7-3.5 0-4.3 2.4-3 1.3.6 2.5.6 3.8-.1zm15.1 4.1c0 .5-.7.9-1.5.9-1.5 0-2-1.2-.9-2.3.8-.8 2.4.1 2.4 1.4zm-123.6 1c-.3.5-1 .7-1.5.3-.5-.3-.7-1-.3-1.5.3-.5 1-.7 1.5-.3.5.3.7 1 .3 1.5zm27.8 8.6c2.6 2.5 3.7 5.3 2.1 5.3-1 0-7.3-6.2-7.3-7.2 0-1.6 2.5-.7 5.2 1.9zm70.2-2c.7.7-5.2 7.3-6.6 7.3-1.6 0-.7-2.5 1.9-5.2 2.8-2.9 3.5-3.3 4.7-2.1zm-23.7 3.6c11.4 5.8 17.5 15.8 17.6 28.6.1 16.1-9.9 28.5-25.3 31.3-18.9 3.6-36.1-9.3-37.7-28.1-1.3-15.1 7-28.3 20.9-33.3 7.5-2.6 17.5-2 24.5 1.5zm-77.7.7c0 .5-.5 1.2-1.1 1.6-1.4.8-3.3-1.1-2.5-2.5.7-1.1 3.6-.4 3.6.9zm130.8.3c.2 1-.3 1.7-1.2 1.7-1.8 0-2.9-1.6-2.1-3.1.9-1.4 2.9-.6 3.3 1.4zm-110 11.2c-3.8 9.4-3.6 9-4.5 8.1-1-1 1.6-10.6 3.9-14.4 3.6-5.8 3.9-1.9.6 6.3zm88.5-2.5c2.8 5.6 3.7 11.5 1.5 10.8-.7-.3-1.6-2.1-2-4.1-.4-2.1-1.7-5.5-2.8-7.7-2.3-4.6-2.4-5.3-.7-4.8.6.2 2.4 2.8 4 5.8zm-106.8 1c0 .7-.6 1.5-1.2 1.7-.8.3-1.3-.4-1.3-1.7 0-1.3.5-2 1.3-1.8.6.3 1.2 1.1 1.2 1.8zm125.5.6c0 1.7-2.6 1.9-3.6.3-.7-1.2 1.5-3.1 2.8-2.3.4.3.8 1.2.8 2zm-134.6 8.5c-.8 1.4-3.4 1.1-3.4-.4 0-.8.3-1.7.7-2 .9-.9 3.4 1.3 2.7 2.4zm144.1-1c0 .7-.8 1.5-1.7 1.7-1.8.3-2.5-1.8-1.1-3.2 1-1 2.8-.1 2.8 1.5zm-126.2 7.2c.2.6 3.1 1.2 6.5 1.5 7.2.5 9.4 2.2 2.9 2.2-5.2 0-10.3 2.3-11.2 5-.9 2.7-2.2 2.5-2.9-.5-.4-1.6-1.9-3-3.9-3.9l-3.2-1.4 3.3-1.2c2-.8 3.7-2.3 4.3-3.9 1-2.5 1.1-2.5 2.4-.7.8 1 1.6 2.3 1.8 2.9zm111.4 0c.4.4 1.7 1.4 2.8 2.2 1.9 1.3 1.9 1.4-.8 2.4-1.5.6-3.2 2.2-3.7 3.7l-1 2.6-2.9-3c-2.8-3.1-4.7-3.9-11.1-4.5-2.8-.3-2.6-.4 1.3-.5 5.8-.2 10.3-2.4 11.3-5.4.6-2.1.7-2.1 2-.2.7 1 1.7 2.3 2.1 2.7zm-131.5 3.2c0 .5-.6 1.4-1.5 1.9-1.7 1.1-5.1-1-4.1-2.6.7-1.2 5.4-.6 5.6.7zm151.6-.3c-.5 1.5-5.8 2.4-5.8 1 0-1.5 1.2-2.2 3.8-2.2 1.4 0 2.2.5 2 1.2zm-124.8 10.7c0 1.1 1.5 4.9 3.4 8.5 3.7 7.1 3.3 9.7-.7 4.4-2.6-3.4-6-13.2-5-14.2 1.2-1.2 2.3-.6 2.3 1.3zm93.5 4c-1.9 5.4-5.6 12.1-6.7 12.1-1.3 0-1-1.4 2-8.1 1.6-3.5 3.2-7.3 3.6-8.3.4-1.3 1-1.6 1.7-.9.6.6.4 2.4-.6 5.2zm-117.5-2c0 1.4-1.8 2.3-3 1.6-.6-.4-.8-1.1-.5-1.6.8-1.2 3.5-1.2 3.5 0zm144 .6c0 .8-.6 1.5-1.4 1.5-1.7 0-2.8-1.4-1.9-2.4 1.2-1.2 3.3-.6 3.3.9zm-135 6.1c0 .8-.7 1.4-1.5 1.4-1.5 0-2.1-2.1-.9-3.3 1-.9 2.4.2 2.4 1.9zm125-.1c0 .8-.6 1.5-1.4 1.5-1.7 0-2.8-1.4-1.9-2.4 1.2-1.2 3.3-.6 3.3.9zm-127.7 9c.1.5-.6 1.1-1.5 1.3-1.1.2-1.8-.3-1.8-1.3 0-1.7 3-1.8 3.3 0zm31 3.6c-1.8 1.9-3.6 2.8-4.3 2.4-.8-.5-.2-1.8 2.1-4.1 2.2-2.3 3.6-3.1 4.3-2.4.7.7 0 2-2.1 4.1zm99.7-3.6c0 .8-.9 1.5-2 1.5-2 0-2.6-1.1-1.3-2.3 1.2-1.3 3.3-.7 3.3.8zm-31.6 2.1c4.1 3.6 2 5.4-2.3 1.9-1.7-1.5-3.1-3.1-3.1-3.6 0-1.6 2.5-.9 5.4 1.7zm-77.8 5.3c1.5 1.1 2 2.2 1.4 2.6-.5.3-1 2.2-1 4.1 0 3.2-.2 3.4-2 2.4-1.4-.7-2.6-.8-3.9 0-2.9 1.5-3 1.3-2.4-2.4.3-1.9.1-3.6-.6-4-1.9-1.2-1.2-2.6 1.3-2.6 1.4 0 2.8-.5 3.1-1 .9-1.4 1.3-1.3 4.1.9zm91.7.5c.3-.3 1.1-.3 1.7.1.8.5.8 1.1-.1 2.1-.7.8-.9 2.7-.5 4.9l.7 3.6-2.5-1.6c-1.9-1.3-2.9-1.4-4.5-.6-2.9 1.6-3.1 1.4-2.5-1.9.4-1.8.1-3.6-.6-4.5-1-1.2-1-1.5.3-1.5.8 0 2-.7 2.7-1.5 1.2-1.4 1.5-1.4 3 0 .9.8 1.9 1.2 2.3.9zm-61.5 9.6c6.8 1.5 7 3.5.3 2.7-4.9-.6-11.1-3.2-16.4-6.9-4.9-3.5-1.9-3.7 4.5-.2 3.5 1.8 8.7 3.8 11.6 4.4zm43.2-6.6c0 2.1-13.5 8.5-19.4 9.3-6.9.9-5.7-1.7 1.5-3.2 3-.6 7.9-2.5 10.9-4.2 6.5-3.6 7-3.8 7-1.9zm-30 6.2c0 3-.4 5.4-1 5.4s-1-2.7-1-6.1c0-3.7.4-5.8 1-5.4.6.3 1 3.1 1 6.1zm-61-3.6c0 1.1-.4 2-.9 2-1.4 0-2.3-1.8-1.6-3 1-1.7 2.5-1.1 2.5 1zm122.8-.2c.2.7-.3 1.2-1.2 1.2-.9 0-1.6-.7-1.6-1.6 0-1.7 2.2-1.4 2.8.4zm-116.8 11.3c0 .5-.7.9-1.5.9-1.5 0-2-1.2-.9-2.3.8-.8 2.4.1 2.4 1.4zm110.8 0c-.2.6-.8 1-1.3 1s-1.1-.4-1.3-1c-.2-.6.4-1.1 1.3-1.1s1.5.5 1.3 1.1zm-55 2.4c.8 1.7 2 2.5 3.7 2.5 3.2 0 3.2 1.4-.1 2.9-1.7.8-2.5 1.7-2.2 2.9.4 1.4-.2 1.8-3.2 1.8-3.2.1-3.6-.1-3.3-2 .3-1.6-.2-2.4-2.4-3.3l-2.8-1.1 3.3-1.3c1.7-.7 3.5-2.1 3.8-3.1.8-2.5 1.9-2.2 3.2.7zm-28.8 1c0 1.9-2 2.9-3.2 1.7-1.5-1.5-.2-4.3 1.7-3.6.8.3 1.5 1.2 1.5 1.9zm-14 0c0 .8-.4 1.5-1 1.5-.5 0-1-.7-1-1.5s.5-1.5 1-1.5c.6 0 1 .7 1 1.5zm72.4 0c.3.9-.1 1.8-1 2.2-1.9.7-3.9-1.1-3-2.6 1-1.6 3.3-1.3 4 .4zm12.6.6c0 .5-.7.9-1.5.9-1.5 0-2-1.2-.9-2.3.8-.8 2.4.1 2.4 1.4zm-81 6.9c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm22 1c0 1.1-.7 2-1.5 2s-1.5-.9-1.5-2 .7-2 1.5-2 1.5.9 1.5 2zm32.3-1.3c.9.9-1.3 3.4-2.4 2.7-1.4-.8-1.1-3.4.4-3.4.8 0 1.7.3 2 .7zm21.7.3c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1zm-64 4.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5zm53.2 0c0 .5-.5 1.1-1.1 1.3-.6.2-1.1-.4-1.1-1.3s.5-1.5 1.1-1.3c.6.2 1.1.8 1.1 1.3zm-25.7 8.5c0 .8-1 1.6-2.2 1.8-1.8.3-2.3-.2-2.3-1.8s.5-2.1 2.3-1.8c1.2.2 2.2 1 2.2 1.8z"></path>
        </g>
        <path d="M111.468 91.475c-1.9.6-1.9.7-.1 1.3 2 .8 2.9.4 2.4-1.1-.2-.5-1.3-.6-2.3-.2zm-3.6 3.8c0 1.1 3.7 3.2 4.4 2.5 1.2-1.2.6-2.5-.9-1.9-.8.3-1.5.1-1.5-.4 0-.6-.4-1-1-1-.5 0-1 .3-1 .8zm-42 4.2c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zm40-.4c0 .8 3.2 3.3 4.3 3.4.4 0 .7-.5.7-1 0-.6-.7-1-1.5-1s-1.5-.5-1.5-1c0-.6-.4-1-1-1-.5 0-1 .3-1 .6zm-44.5 1.4c.3.5.8 1 1.1 1 .2 0 .4-.5.4-1 0-.6-.5-1-1.1-1-.5 0-.7.4-.4 1zm41.5 2c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zm-38 1c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zm35 1c0 .5.5 1 1.1 1 .5 0 .7-.5.4-1-.3-.6-.8-1-1.1-1-.2 0-.4.4-.4 1zm6.5 0c.3.5 1 1 1.6 1 .5 0 .9-.5.9-1 0-.6-.7-1-1.6-1-.8 0-1.2.4-.9 1zm-37 2c1 1.1 2.3 2 2.8 2 .6 0 .1-.9-1.1-2-1.2-1.1-2.4-2-2.8-2-.4 0 .1.9 1.1 2zm-5.5 0c0 .5.5 1 1.1 1 .5 0 .7-.5.4-1-.3-.6-.8-1-1.1-1-.2 0-.4.4-.4 1zm11.5 1c-.3.5-.1 1 .4 1 .6 0 1.1-.5 1.1-1 0-.6-.2-1-.4-1-.3 0-.8.4-1.1 1zm23.5 0c0 .5.7 1 1.5 1s1.5.4 1.5 1c0 .5.5 1 1.2 1 .6 0 .3-.9-.7-2-2-2.2-3.5-2.6-3.5-1zm5 0c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zm-12.5 1c.3.5 1.1 1 1.6 1 .6 0 .7-.5.4-1-.3-.6-1.1-1-1.6-1-.6 0-.7.4-.4 1zm-24 1c.3.5 1.1 1 1.6 1 .6 0 .7-.5.4-1-.3-.6-1.1-1-1.6-1-.6 0-.7.4-.4 1zm19.5 0c0 .5.5 1 1.1 1 .5 0 .7-.5.4-1-.3-.6-.8-1-1.1-1-.2 0-.4.4-.4 1zm-14.7 1.4c-1.6 1.9-.4 2.9 1.3 1.1.8-.7 1.4-1.6 1.4-1.9 0-1-1.5-.6-2.7.8zm25.1.1c2.6 1.9 4.2 1.9 2.6 0-.7-.8-2-1.5-2.9-1.5-1.3.1-1.3.3.3 1.5zm-20.8.4c-.4.5-.2 1.2.3 1.5.5.4 1.2.2 1.5-.3.4-.5.2-1.2-.3-1.5-.5-.4-1.2-.2-1.5.3zm16.4-.4c0 .8 2.7 3.5 3.4 3.5 1.4 0 .4-2-1.4-3-1.1-.6-2-.8-2-.5zm-4 1.5c0 .5.5 1 1 1 .6 0 1-.5 1-1 0-.6-.4-1-1-1-.5 0-1 .4-1 1zm-5.8 2c-1 1.7-1 2 .4 2 .8 0 1.3-.4.9-.9-.3-.6.3-1.4 1.2-2 1.4-.8 1.5-1 .3-1.1-.8 0-2.1.9-2.8 2zm3.8 1c0 .5.5 1 1.1 1 .5 0 .7-.5.4-1-.3-.6-.8-1-1.1-1-.2 0-.4.4-.4 1z"></path>
      </g>
    </svg>
  );
}