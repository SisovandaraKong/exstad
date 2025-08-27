/** @format */

export interface MainCard {
	id: number;
	title: string;
	description: string;
	image: string;
}
export interface MainCardProps {
	mainCard: MainCard;
	className?: string;
}
