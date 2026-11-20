export const site = {
  name: 'NASA Thawing Centre',
  short: 'NASA',
  tagline: 'Thawing, towing & emergency rescue — 24/7',
  contactName: process.env.NEXT_PUBLIC_CONTACT_NAME || 'Sinchine',
  helpline: process.env.NEXT_PUBLIC_HELPLINE || '+91 75583 15802',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '917558315802',
  email: process.env.NEXT_PUBLIC_EMAIL || 'support@nasathawing.in',
  address: process.env.NEXT_PUBLIC_ADDRESS || '1/3D, Shyamsundar Pally, Howrah 700061',
};

export const telHref = `tel:${site.helpline.replace(/\s/g, '')}`;
export const whatsappHref = (text = 'Hi NASA Thawing Centre, I need roadside assistance.') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
