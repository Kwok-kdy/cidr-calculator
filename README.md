# CIDR Calculator

A web-based IPv4 subnetting calculator built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

The project is designed as both a practical subnetting utility and a visual learning tool for understanding IPv4 addressing, CIDR notation, subnet masks, and subnet boundaries.

## Features

- IPv4 address input
- CIDR prefix input
- Subnet mask input
- Automatic CIDR ↔ subnet mask conversion
- IPv4 class identification
  - Class A
  - Class B
  - Class C
  - Class D
  - Class E
- Binary representation of IPv4 addresses
- Visual distinction between network bits and host bits
- Binary subnet mask visualization
- Automatic subnet calculation
- Network address
- Broadcast address
- First usable host
- Last usable host
- Total number of addresses
- Number of usable hosts
- Support for `/31` and `/32` networks
- Responsive dark-mode interface

## Example

For the following input:

```text
IP Address: 192.168.1.75
CIDR: /26
Subnet Mask: 255.255.255.192
```

The calculator produces:

```text
Class: Class C

Network Address:    192.168.1.64
Broadcast Address:  192.168.1.127
First Host:         192.168.1.65
Last Host:          192.168.1.126
Total Addresses:    64
Usable Hosts:       62
```

It also displays the binary representation of the address and subnet mask:

```text
IP Address
11000000.10101000.00000001.01001011

Subnet Mask
11111111.11111111.11111111.11000000
```

The CIDR prefix determines which bits belong to the network portion and which belong to the host portion.

For `/26`:

```text
NNNNNNNN.NNNNNNNN.NNNNNNNN.NNHHHHHH
```

Where:

- `N` = Network bit
- `H` = Host bit

## Technologies

- React
- TypeScript
- Vite
- Tailwind CSS

## Project Structure

```text
src/
├── components/
│   ├── BitState.tsx
│   ├── CalculatorInput.tsx
│   ├── InfoCard.tsx
│   └── SubnetInformation.tsx
│
├── network/
│   ├── ipv4.ts
│   └── subnet.ts
│
├── types/
│   └── subnet.ts
│
├── App.tsx
├── index.css
└── main.tsx
```

The networking logic is separated from the React UI so that IPv4 and subnet calculations can be implemented and tested independently.

## Installation

Clone the repository:

```bash
git clone https://github.com/Kwok-kdy/cidr-calculator.git
```

Enter the project directory:

```bash
cd cidr-calculator
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Production Build

Create a production build with:

```bash
npm run build
```

The generated production files will be placed in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

## IPv4 Class Information

The calculator also displays the historical IPv4 address class based on the first octet.

| Class | First Octet | Classful Default Mask |
|---|---:|---|
| A | 1–126 | `255.0.0.0 (/8)` |
| B | 128–191 | `255.255.0.0 (/16)` |
| C | 192–223 | `255.255.255.0 (/24)` |
| D | 224–239 | Multicast |
| E | 240–255 | Reserved |

`127.0.0.0/8` is treated separately as the loopback address range.

IPv4 classes are a historical classful-networking concept. Modern IPv4 networks generally use CIDR, but class information is included in this project for educational purposes.

## Subnet Calculation

For an IPv4 network, the number of host bits is determined by:

```text
Host Bits = 32 - CIDR Prefix
```

The total number of addresses is:

```text
2 ^ Host Bits
```

For example, a `/26` network has:

```text
32 - 26 = 6 host bits
2 ^ 6 = 64 addresses
```

For conventional IPv4 subnets from `/0` through `/30`, the network and broadcast addresses are not usable as host addresses.

The calculator also handles `/31` point-to-point networks and `/32` single-address prefixes separately.

## Purpose

This project was created to practice and demonstrate:

- IPv4 addressing
- Binary representation of IP addresses
- Subnet masks
- CIDR notation
- Network and host bit boundaries
- IPv4 subnet calculations
- React component design
- TypeScript
- Tailwind CSS

## License

This project is intended for educational use.
