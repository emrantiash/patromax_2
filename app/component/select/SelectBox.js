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



export default function SelectBox({placeholder,data,selectedValue,height ,width}) {

  return (
    <Select 
    style={{
        borderRadius : 20,
        fontSize :  14,
        border : '1px solid red'
    }}
    onValueChange={selectedValue}
    >
      <SelectTrigger variant="outline" size="sm" style={{
        borderRadius : 10,
        height : height,
        width  : width,
        // borderColor : '#fff'
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
            <SelectItem label={_data.name} value={_data.name}  key={index} textStyle={{
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
