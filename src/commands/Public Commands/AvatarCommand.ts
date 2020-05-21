import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av"],
            category: "Public Commands",
            description: {
                content: "Display the avatar of a member.",
                usage: "avatar [ Member ]",
                examples: [
                    "avatar",
                    "avatar @User#0001",
                    "avatar User"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | Number => {
                        if(str && !isNaN(Number(str)) && [16, 13, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["-size="], // ts!avatar @User#0001 -size=2048
                    default: 2048
                }
            ]
        });
    }

    public exec(message: Message, { member, size }: { member: GuildMember, size: number }): Promise<Message> {
        return message.util.send(new MessageEmbed()
            .setTitle(`Avatar | ${member.user.tag}`)
            .setColor(0x007acc)
            .setImage(member.user.displayAvatarURL({ size: size as ImageSize }))
        );
    }
}