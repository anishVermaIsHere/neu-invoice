import MainContainer from '@/components/common/main'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import LinkElement from '@/components/ui/link'

const VerifyRequestPage = () => {
  return (
    <MainContainer>
        <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Verify</CardTitle>
        <CardDescription>
          Verfication link sent to your email. Check your email to signin with link
        </CardDescription>
      </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {/* <Label htmlFor="name">Email</Label>
              <Input type="email" name="email" placeholder="davidpaul@test.com" required/> */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <LinkElement href="/" >
            Go to Home
          </LinkElement>
        </CardFooter>
    </Card>
    </MainContainer>
  )
}

export default VerifyRequestPage