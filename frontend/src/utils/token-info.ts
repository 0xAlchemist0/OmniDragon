export async function findTokens(tokens: any) {
  for (let i = 0; i <= tokens.length; i++) {
    const tokenInfo = await findToken(tokens[i]);
  }
}

export async function findToken(address: any) {}
