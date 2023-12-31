import moment from "moment";

export function getDistance({
	lat1,
	lon1,
	lon2,
	lat2,
}: {
	lat1: number;
	lon1: number;
	lon2: number;
	lat2: number;
}): number {
	// Haversine formula
	let p = 0.017453292519943295; // Math.PI / 180
	let c = Math.cos;
	let a =
		0.5 -
		c((lat2 - lat1) * p) / 2 +
		(c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
	// in metres
	return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371000 km
}

export function getMessCategory(prevSavedTime: Date): boolean {
	const currTime = moment().format("HH:mm:ss");
	const prevSavedTimeStr = moment(prevSavedTime).format("HH:mm:ss");
	if (currTime >= "07:30:00" && currTime <= "09:30:00") {
		if (prevSavedTimeStr >= "07:30:00" && prevSavedTimeStr <= "09:30:00") {
			return true;
		}
	} else if (currTime >= "12:30:00" && currTime <= "14:00:00") {
		if (prevSavedTimeStr >= "12:30:00" && prevSavedTimeStr <= "14:00:00") {
			return true;
		}
	} else if (currTime >= "17:00:00" && currTime <= "18:00:00") {
		if (prevSavedTimeStr >= "17:00:00" && prevSavedTimeStr <= "18:00:00") {
			return true;
		}
	} else if (currTime >= "19:30:00" && currTime <= "21:00:00") {
		if (prevSavedTimeStr >= "19:30:00" && prevSavedTimeStr <= "21:00:00") {
			return true;
		}
	}
	return false;
}

export function whichMessCategory(prevSavedTime: Date): string {
	const currTime = moment().format("HH:mm:ss");
	const prevSavedTimeStr = moment(prevSavedTime).format("HH:mm:ss");
	if (currTime >= "07:30:00" && currTime <= "09:30:00") {
		if (prevSavedTimeStr >= "07:30:00" && prevSavedTimeStr <= "09:30:00") {
			return "breakfast";
		}
	} else if (currTime >= "12:30:00" && currTime <= "14:00:00") {
		if (prevSavedTimeStr >= "12:30:00" && prevSavedTimeStr <= "14:00:00") {
			return "lunch";
		}
	} else if (currTime >= "17:00:00" && currTime <= "18:00:00") {
		if (prevSavedTimeStr >= "17:00:00" && prevSavedTimeStr <= "18:00:00") {
			return "snack";
		}
	} else if (currTime >= "19:30:00" && currTime <= "21:00:00") {
		if (prevSavedTimeStr >= "19:30:00" && prevSavedTimeStr <= "21:00:00") {
			return "dinner";
		}
	}
	return "none";
}

export function isMessTime(): boolean {
	const currTime = moment().format("HH:mm:ss");

	if (
		(currTime >= "07:30:00" && currTime <= "09:30:00") ||
		(currTime >= "12:30:00" && currTime <= "14:00:00") ||
		(currTime >= "17:00:00" && currTime <= "18:00:00") ||
		(currTime >= "19:30:00" && currTime <= "21:00:00")
	) {
		return true;
	}
	return false;
}


// const XLSX = require("xlsx");

// export function getTimeDifference(time1: string, time2: string) {
// 	const format = "HH:mm:ss"; // 24-hour format
// 	const startTime = moment(time1, format);
// 	const endTime = moment(time2, format);

// 	const duration = moment.duration(endTime.diff(startTime));

// 	// return {
// 	//     minutes: duration.minutes(),
// 	//     hours: duration.hours(),
// 	//     seconds: duration.seconds(),
// 	// };

// 	const totalSeconds =
// 		duration.hours() * 60 * 60 +
// 		duration.minutes() * 60 +
// 		duration.seconds();
// 	return totalSeconds;
// }

// export function parsedStudentData(filePath: string) {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const workbook = XLSX.readFile(filePath);
// 			const sheetName = workbook.SheetNames[0];
// 			const sheet = workbook.Sheets[sheetName];
// 			const jsonData = XLSX.utils.sheet_to_json(sheet, {
// 				header: 1,
// 				raw: false,
// 				defval: "",
// 			});

// 			const headers = jsonData[0];
// 			const data = jsonData.slice(1);

// 			const parsedData1 = data.map((row) => {
// 				const rowData = {};
// 				headers.forEach((header, index) => {
// 					rowData[header] = row[index]
// 						?.trim()
// 						?.replace(/[\r\n]+/g, " ");
// 				});
// 				return rowData;
// 			});

// 			const parsedData = await Promise.all(
// 				parsedData1.map(async (obj) => {
// 					const hashedPwd = await bcrypt.hash(obj.password, 10);
// 					return {
// 						...obj,
// 						password: hashedPwd,
// 					};
// 				})
// 			);
// 			resolve(parsedData);
// 		} catch (error) {
// 			console.log(error);
// 			reject(error);
// 		}
// 	});
// }
