function isGoogleMapsUrl(text) {
  if (!text) return false;
  const patterns = [
    /^https?:\/\/(www\.)?(maps\.google|google\.com\/maps)/i,
    /^https?:\/\/goo\.gl\/maps/i,
    /^https?:\/\/maps\.app\.goo\.gl/i,
  ];
  return patterns.some((p) => p.test(text.trim()));
}

module.exports = { isGoogleMapsUrl };
