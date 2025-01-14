# Annoying Password Game

This project is a React-based game that challenges users to create increasingly complex passwords based on a series of conditions. The game features a simple Three.js background animation and uses shadcn/ui components for a clean, modern look.

## Features

- Dynamic password conditions that increase in difficulty
- Real-time password validation
- Display of only unmet conditions for a cleaner UI
- Password strength meter
- Game timer to track completion time
- Leaderboard to compare scores
- Simple Three.js animated background
- Responsive design using shadcn/ui components

## How to Play

1. Start by entering a password that meets the initial condition.
2. As you meet each condition, it will disappear from the list, and a new one will be added.
3. Continue creating passwords that meet all active conditions.
4. The game ends when you've successfully met all predefined conditions.
5. Your completion time will be recorded, and you can submit it to the leaderboard.

## Password Conditions

The game includes various password conditions, such as:

- Including Roman numerals
- Meeting length requirements
- Including specific character types (uppercase, lowercase, numbers, special characters)
- Meeting numerical criteria based on the Roman numeral part
- Using a minimum number of unique Roman numeral symbols

## Technologies Used

- React
- Next.js
- TypeScript
- shadcn/ui components
- GSAP (GreenSock Animation Platform)
- Three.js (for background animation)

## Setup and Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open `http://localhost:3000` in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

