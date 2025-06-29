'use client';

import Script from 'next/script';

export default function ConsultPage() {
  return (
    <>
      <Script id="omnidimension-web-widget" async src="https://backend.omnidim.io/web_widget.js?secret_key=e61498e42f1ff4535219872d8902fb32" />
    </>
  );
}
