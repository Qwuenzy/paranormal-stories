import sanitizeHtml from 'sanitize-html'

export default function sanitizeData(data) {
  const sanitizedinfo = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitizedinfo[key] = sanitizeHtml(value, {
        allowedTags: ['b'],
        allowedAttributes: {}
      });
    } else {
      sanitizedinfo[key] = value;
    }
  }

  return sanitizedinfo;
}
