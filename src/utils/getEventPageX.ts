export function getEventPageX(e: MouseTouchEvent<HTMLUListElement>) {
	if (e.type === "touchstart") {
		return (e as TouchEvent).touches[0].pageX;
	} else {
		return (e as MouseEvent).pageX;
	}
}
