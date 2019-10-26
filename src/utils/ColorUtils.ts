/**
* name 
*/
module ColorUtils {

	/**红色 */
	export const red = "#ff0000";
	/**橙色 */
	export const orange = "#ffff00";
	/**紫色 */
	export const purple = "#9900ff";
	/**蓝色*/
	export const blue = "#0000ff";
	/**绿色 */
	export const green = "#00ff00";
	/**黑色 */
	export const black = "#000000";
	/**白色 */
	export const white = "#ffffff";

	/**
	 * 红色的颜色滤镜
	 */
	export const redFilters =
		[1, 0, 0, 0, 0, // R
			0, 0, 0, 0, 0, // G
			0, 0, 0, 0, 0, // B
			0, 0, 0, 1, 0  // A
		];

}