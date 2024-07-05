export const printMessages = (messages: string[]) => {
    let result: string = "";
    for (let i = 0; i < messages.length; i++) {
        result += `${i + 1}) ${messages[i]}\n`;
    }
    alert(result);
};
