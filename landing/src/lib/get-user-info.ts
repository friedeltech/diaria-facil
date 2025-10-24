export function getUserBrowser(userAgent: string) {
  if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) {
    return "Chrome";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else if (userAgent.includes("Firefox")) {
    return "Firefox";
  } else if (userAgent.includes("Edg")) {
    return "Edge";
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return "Opera";
  }
  return "Desconhecido";
}

export function getOperatingSystem(userAgent: string) {
  if (userAgent.includes("Windows NT 10.0")) {
    return "Windows 10/11";
  } else if (userAgent.includes("Windows NT")) {
    return "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    return "macOS";
  } else if (userAgent.includes("Linux")) {
    return "Linux";
  } else if (userAgent.includes("Android")) {
    return "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    return "iOS";
  }
  return "Desconhecido";
}
