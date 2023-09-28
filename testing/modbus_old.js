const frames = require("./frames_old.json");

function Assemble_CT_Modbus_Frame(Frame_Info)
{
    var Register_High 	= [];
    var Register_Low 	= [];
    var Register_H 		= ""; 
    var Register_L 		= "";
    var Combined 		= 0;
	
    let Current_Frame;
	
	/*If frame type has a standard header*/
    if (Frame_Info.Function_Code !== 16) 
	{
		/*Assign required header space (10 bytes + enough bytes for all data)*/
        Current_Frame = Buffer.alloc(10 + Object.getOwnPropertyNames(Frame_Info.Data).length);
    } 
	else 
	{
		/*Assign required header space (13 bytes + enough bytes for all data)*/
        Current_Frame = Buffer.alloc(13 + Object.getOwnPropertyNames(Frame_Info.Data).length);
    }
	
	/*If frame Parameter's hex value needs a 0 added to ensure its lentgh is 2 characters long*/
    if (Frame_Info.Parameter.toString().length < 2) 
	{
		/*Add 0 to hex value ex. 0xf -> 0x0f*/
		/*Then combine the Menun value to the Parameter value to create the drive address*/
        Combined = parseInt(Frame_Info.Menu.toString() + "0" + Frame_Info.Parameter.toString()).toString(16);
    } 
	else 
	{
		/*Parameters's hex value is allready 2 characters long ex. 0x7f*/
		/*Then combine the Menun value to the Parameter value to create the drive address*/
        Combined = parseInt(Frame_Info.Menu.toString() + Frame_Info.Parameter.toString()).toString(16);
    }
	
	/*Insert address of drive to a high and low register*/
    for (var c = Combined.length - 1; c >= 0; c--) 
	{
        if (c >= Combined.length - 2) 
		{
            Register_Low.unshift(Combined[c]);
        } 
		else 
		{
            Register_High.unshift(Combined[c]);
        }
    }
	
    Register_High.forEach((item) => 
	{
        Register_H = Register_H + item
    });
	
    Register_Low.forEach((item) => 
	{
        Register_L = Register_L + item
    });
	
	/*Assemble final frame*/
    Current_Frame.writeUInt16BE(Frame_Info.Transaction_ID, 0);
    Current_Frame.writeUInt16BE(Frame_Info.Protocol_ID, 2);
    Current_Frame.writeUInt16BE(Frame_Info.Length, 4);
    Current_Frame.writeUInt8(Frame_Info.Unit_ID, 6);
    Current_Frame.writeUInt8(Frame_Info.Function_Code, 7);
    Current_Frame.writeUInt8(parseInt(Register_H, 16), 8);
    Current_Frame.writeUInt8(parseInt(Register_L, 16) - 1, 9);
	
	/*If frame does not require a special header*/
    if (Frame_Info.Function_Code !== 16) 
	{
        var count = 10;
    } 
	else 
	{
        var count = 13;
        Current_Frame.writeUInt8(Frame_Info.Register_Qauntity_H, 10);
        Current_Frame.writeUInt8(Frame_Info.Register_Qauntity_L, 11);
        Current_Frame.writeUInt8(Frame_Info.Byte_Count, 12);
    }
	
    Object.getOwnPropertyNames(Frame_Info['Data']).forEach((element) => 
	{
        Current_Frame.writeUInt8(Frame_Info['Data'][element], count);
        count++;
    });

	const combinedHex 	= Register_H+Register_L;
	const decimalNumber = parseInt(combinedHex, 16);
	
  return new Uint8Array(Current_Frame);
}

console.log(Assemble_CT_Modbus_Frame(frames["Heartbeat_High"]));