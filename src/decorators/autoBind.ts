export function AutoBind(_: any, _2: any, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const newDescriptor = {
        enumerable: false,
        configurable: false,
        get() {
            return originalMethod.bind(this);
        }
    };
    return newDescriptor;
}