/**
 * A decorator that binds values to their class instance.
 * @example
 * class C {
 *   @bind
 *   foo () {
 *     return this;
 *   }
 * }
 * let f = new C().foo;
 * f() instanceof C;    // true
 */
export function bind(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  return {
    // the first time the prototype property is accessed for an instance,
    // define an instance property pointing to the bound function.
    // This effectively "caches" the bound prototype method as an instance property.
    get() {
      let bound = descriptor.value.bind(this);
      Object.defineProperty(this, propertyKey, {
        value: bound
      });
      return bound;
    }
  };
}

/**
 * Turns a given `ImageBitmap` into `ImageData`.
 */
export async function bitmapToImageData(bitmap: ImageBitmap): Promise<ImageData> {
  // Make canvas same size as image
  // TODO: Move this off-thread if possible with `OffscreenCanvas` or iFrames?
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  // Draw image onto canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error("Could not create canvas context");
  }
  ctx.drawImage(bitmap, 0, 0);
  return ctx.getImageData(0, 0, bitmap.width, bitmap.height);
}

