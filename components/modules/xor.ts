export const XOR = {
    encode(input: string): string {
        console.log('XOR will be deprecated soon')
        return input
            .toString()
            .split('')
            .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(NaN) ^ 2) : char))
            .join('')
      },
      decode(input: string): string {
        if (!input) return input
        const [str, ...search] = input.split('?')
        console.log('XOR will be deprecated soon')
        return (
            str            
            .split('')
            .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(NaN) ^ 2) : char))
            .join('') + (search.length ? '?' + search.join('?') : '')
        )
    }
}