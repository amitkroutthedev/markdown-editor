import * as Tooltip from "@radix-ui/react-tooltip";

interface TooltipButtonProps {
	button: React.ReactNode;
	content: string;
  }

const TooltipButton=({button,content}:TooltipButtonProps) => (
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
        {button}
      </Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content className="border border-black px-1 rounded-xl bg-white" sideOffset={2} side="bottom">
				<span className="text-sm">{content}</span><Tooltip.Arrow />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	</Tooltip.Provider>
);

export default TooltipButton