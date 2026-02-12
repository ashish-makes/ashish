interface OptimizationOptions {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string;
    format?: string;
}

/**
 * Enhances Cloudinary URLs with optimization parameters.
 * f_auto: automatically chooses the best format (WebP, AVIF, WebM).
 * q_auto: automatically adjusts quality for optimal balance.
 * w_XXX, h_XXX: resizes the asset to specific dimensions.
 * c_XXX: applies a crop/resize mode (default: limit).
 */
export function getOptimizedUrl(url: string | null | undefined, options: OptimizationOptions = {}): string {
    if (!url) return '';

    // Only process Cloudinary URLs
    if (!url.includes('res.cloudinary.com')) return url;

    // Check if it's a video based on extension or path
    const isVideo = url.match(/\.(mp4|webm|ogg|mov|m4v)$/) || url.includes('/video/upload/');

    // Default options for videos to prevent enormous payloads
    const {
        width = isVideo ? 1280 : undefined,
        height,
        crop = 'limit',
        quality = 'auto',
        format = 'auto'
    } = options;

    // Build transformation string
    const transformations = [
        `f_${format}`,
        `q_${quality}`,
        width ? `w_${width}` : null,
        height ? `h_${height}` : null,
        (width || height) ? `c_${crop}` : null
    ].filter(Boolean).join(',');

    // Inject transformations after /upload/
    const uploadMatch = url.match(/\/upload\/(v\d+\/)?/);
    if (uploadMatch) {
        const baseInsertionPoint = url.indexOf('/upload/') + 8;
        return `${url.substring(0, baseInsertionPoint)}${transformations}/${url.substring(baseInsertionPoint)}`;
    }

    return url;
}
