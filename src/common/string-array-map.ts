/**
 * A class that behaves like an unordered map (dictionary) where keys are strings
 * and values are arrays of strings.
 */
export class StringArrayMap {
  private data: Map<string, string[]>;

  constructor(initialData?: Iterable<readonly [string, string[]]> | null) {
    this.data = new Map<string, string[]>(initialData);
  }

  /**
   * Sets the value for the specified key.
   * @param key The key of the element to add.
   * @param value The array of strings to associate with the key.
   */
  set(key: string, value: string[]): void {
    this.data.set(key, value);
  }

  /**
   * Gets the value associated with the specified key.
   * @param key The key of the element to return.
   * @returns The array of strings associated with the key, or undefined if the key is not found.
   */
  get(key: string): string[] | undefined {
    return this.data.get(key);
  }

  /**
   * Checks if an element with the specified key exists.
   * @param key The key to check for.
   * @returns True if an element with the specified key exists, otherwise false.
   */
  has(key: string): boolean {
    return this.data.has(key);
  }

  /**
   * Removes the element associated with the specified key.
   * @param key The key of the element to remove.
   * @returns True if an element in the map existed and has been removed, or false if the element does not exist.
   */
  delete(key: string): boolean {
    return this.data.delete(key);
  }

  /**
   * Removes all elements from the map.
   */
  clear(): void {
    this.data.clear();
  }

  /**
   * Returns an iterable of keys in the map.
   */
  keys(): IterableIterator<string> {
    return this.data.keys();
  }

  /**
   * Returns an iterable of values in the map.
   */
  values(): IterableIterator<string[]> {
    return this.data.values();
  }

  /**
   * Returns an iterable of key, value pairs for every entry in the map.
   */
  entries(): IterableIterator<[string, string[]]> {
    return this.data.entries();
  }

  /**
   * Returns the number of elements in the map.
   */
  get size(): number {
    return this.data.size;
  }
} 