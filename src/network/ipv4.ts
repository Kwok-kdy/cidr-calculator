export type IPv4ClassInfo = {
  className: "A" | "B" | "C" | "D" | "E" | null;
  description: string;
  defaultCidr: number | null;
  defaultMask: string | null;
};

export function isValidIPv4(ipAddress: string): boolean {
  const octets = ipAddress.split(".");

  if (octets.length !== 4) {
    return false;
  }

  return octets.every((octet) => {
    if (octet === "") {
      return false;
    }

    const value = Number(octet);

    return Number.isInteger(value) && value >= 0 && value <= 255;
  });
}

export function ipToBinary(ipAddress: string): string | null {
  if (!isValidIPv4(ipAddress)) {
    return null;
  }

  return ipAddress
    .split(".")
    .map((octet) => Number(octet).toString(2).padStart(8, "0"))
    .join(".");
}

export function getIPv4ClassInfo(ipAddress: string): IPv4ClassInfo {
  if (!isValidIPv4(ipAddress)) {
    return {
      className: null,
      description: "Invalid IPv4 address",
      defaultCidr: null,
      defaultMask: null,
    };
  }

  const firstOctet = Number(ipAddress.split(".")[0]);

  if (firstOctet === 0) {
    return {
      className: null,
      description: "Reserved",
      defaultCidr: null,
      defaultMask: null,
    };
  }

  if (firstOctet === 127) {
    return {
      className: null,
      description: "Loopback",
      defaultCidr: null,
      defaultMask: null,
    };
  }

  if (firstOctet >= 1 && firstOctet <= 126) {
    return {
      className: "A",
      description: "Class A",
      defaultCidr: 8,
      defaultMask: "255.0.0.0",
    };
  }

  if (firstOctet >= 128 && firstOctet <= 191) {
    return {
      className: "B",
      description: "Class B",
      defaultCidr: 16,
      defaultMask: "255.255.0.0",
    };
  }

  if (firstOctet >= 192 && firstOctet <= 223) {
    return {
      className: "C",
      description: "Class C",
      defaultCidr: 24,
      defaultMask: "255.255.255.0",
    };
  }

  if (firstOctet >= 224 && firstOctet <= 239) {
    return {
      className: "D",
      description: "Class D - Multicast",
      defaultCidr: null,
      defaultMask: null,
    };
  }

  return {
    className: "E",
    description: "Class E - Reserved",
    defaultCidr: null,
    defaultMask: null,
  };
}

export function ipv4ToNumber(ipAddress: string): number | null {
  if (!isValidIPv4(ipAddress)) {
    return null;
  }

  return ipAddress
    .split(".")
    .map(Number)
    .reduce((result, octet) => result * 256 + octet, 0);
}

export function numberToIPv4(value: number): string {
  const octet1 = Math.floor(value / 256 ** 3) % 256;
  const octet2 = Math.floor(value / 256 ** 2) % 256;
  const octet3 = Math.floor(value / 256) % 256;
  const octet4 = value % 256;

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}
