import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  ChevronDownIcon,
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";

const _width = Dimensions.get('window').width 



export default function SelectBox({placeholder,data,selectedValue,height ,width,defaultValue,borderColor}) {

  return (
    <Select 
    style={{
        borderRadius : 4,
        fontSize :  12,
        border : '1px solid red'
    }}
    onValueChange={selectedValue}
    defaultValue={defaultValue}
    // selectedValue = {thisValue}
    >
      <SelectTrigger variant="outline" size="sm" style={{
        borderRadius : 8,
        height : height,
        width  : width,
        padding :  (_width * 2 )/100,
        fontSize : 12,
        borderColor : borderColor ?  borderColor : 'lightgray'
      }}>
        <SelectInput placeholder={placeholder} />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {/* <SelectItem label="UX Research" value="ux" /> */}
          {
            data?.map((_data,index)=>
             ( 
            //  <SelectItem label={_data.name} value={_data.name} />
            <SelectItem label={_data.name} value={_data.value}  key={index} textStyle={{
              fontSize : 14
            }}/>
             )
            )
          }
         
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
