/**
 * Enhances Cloudinary URLs with optimization parameters (f_auto, q_auto).
 * f_auto: automatically chooses the best format (WebP, AVIF, WebM) based on browser support.
 * q_auto: automatically adjusts quality for optimal compression/quality balance.
 */
export function getOptimizedUrl(url: string | null | undefined): string {
    if (!url) return '';

    // Only process Cloudinary URLs
    if (!url.includes('res.cloudinary.com')) return url;

    // Check if it already has optimization patterns to avoid double injection
    if (url.includes('/f_auto') || url.includes('q_auto')) return url;

    // Inject parameters after /upload/
    const uploadMatch = url.match(/\/upload\/(v\d+\/)?/);
    if (uploadMatch) {
        const insertionPoint = uploadMatch.index! + uploadMatch[0].length;
        // If v123456789/ prefix is present, insertionPoint is at the end of it
        // However, standard practice is to put transformations BEFORE the version or right after /upload/
        const baseInsertionPoint = url.indexOf('/upload/') + 8;
        return `${url.substring(0, baseInsertionPoint)}f_auto,q_auto/${url.substring(baseInsertionPoint)}`;
    }

    return url;
}
