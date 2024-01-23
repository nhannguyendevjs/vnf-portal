export const actionFactory = <T>(args: T = null) => ({ payload: args, timestamp: Date.now() })
