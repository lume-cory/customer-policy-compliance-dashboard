'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PlusCircle, ArrowLeft, AlertTriangle, Send } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { hardcodedOptions, hardcodedRequirements, initialChatHistory } from './complianceData'

interface Requirement {
  id: string; 
  article: string;
  subArticle: string;
  regulationText: string;
  controlId?: string;
  controlCategory: string;
  controlText: string;
  confidenceInterval: number;
  policyId?: string;
  policyCategory?: string;
  suggestedPolicyCategory?: string;
  policyText?: string;
  suggestedPolicyText?: string;
  customerRequirements?: Array<{
    customerId: string;
    requirementText: string;
    status: 'compliant' | 'non-compliant';
    complianceGap?: string;
  }>;
}

function DetailedView({ requirement, onClose, regulation, securityControl, companyPolicy }: {
  requirement: Requirement;
  onClose: () => void;
  regulation: string;
  securityControl: string;
  companyPolicy: string;
}) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Button onClick={onClose} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mapping
        </Button>
        <h1 className="text-2xl font-bold mb-4">{regulation}</h1>
        <h2 className="text-xl font-semibold mb-4">{requirement.article} - {requirement.subArticle}</h2>
        <Tabs defaultValue="regulation" className="space-y-4">
          <TabsList>
            <TabsTrigger value="regulation">Regulation</TabsTrigger>
            <TabsTrigger value="security-control">Security Control</TabsTrigger>
            <TabsTrigger value="company-policy">Company Policy</TabsTrigger>
            <TabsTrigger value="customer-requirements">Customer Requirements</TabsTrigger>
          </TabsList>
          <TabsContent value="regulation">
            <Card>
              <CardHeader>
                <CardTitle>Requirement Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{requirement.regulationText}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security-control">
            <Card>
              <CardHeader>
                <CardTitle>Security Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {securityControl}</p>
                  <p><strong>Profile ID:</strong> {requirement.controlId || 'N/A'}</p>
                  <p><strong>Control Category:</strong> {requirement.controlCategory}</p>
                  <div>
                    <p className="font-semibold mb-2">Control Text:</p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <pre className="whitespace-pre-wrap break-words text-sm">{requirement.controlText}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="company-policy">
            <Card>
              <CardHeader>
                <CardTitle>Company Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p><strong>Name:</strong> {companyPolicy}</p>
                  <p><strong>Mapping Confidence:</strong> {requirement.confidenceInterval}%</p>
                  <p><strong>{requirement.policyId ? 'Policy Category:' : 'Suggested Policy Category:'}</strong> {requirement.policyId ? requirement.policyCategory : requirement.suggestedPolicyCategory}</p>
                  <div>
                    <p className="font-semibold mb-2">{requirement.policyId ? 'Policy Text:' : 'Suggested Policy Text:'}</p>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <pre className="whitespace-pre-wrap break-words text-sm">{requirement.policyId ? requirement.policyText : requirement.suggestedPolicyText}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customer-requirements">
            <Card>
              <CardHeader>
                <CardTitle>Customer Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                {requirement.customerRequirements && requirement.customerRequirements.length > 0 ? (
                  <div className="space-y-4">
                    {requirement.customerRequirements.map((customerReq, index) => (
                      <div key={index} className="border-b pb-4 last:border-b-0">
                        <p><strong>Customer:</strong> {customerReq.customerId}</p>
                        <p><strong>Requirement:</strong> {customerReq.requirementText}</p>
                        <p><strong>Status:</strong> 
                          <Badge className={`ml-2 ${customerReq.status === 'compliant' ? 'bg-green-500' : 'bg-red-500'}`}>
                            {customerReq.status}
                          </Badge>
                        </p>
                        {customerReq.complianceGap && (
                          <p><strong>Compliance Gap:</strong> {customerReq.complianceGap}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No specific customer requirements for this regulation article.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}



function ChatInterface({ chatHistory, onSendMessage }: { chatHistory: Array<{ role: string; content: string }>; onSendMessage: (message: string) => void }) {
  const [message, setMessage] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [chatHistory])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle>Compliance Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask a question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export function ComplianceMapperComponent() {
  const [regulation, setRegulation] = useState(hardcodedOptions.regulation[0])
  const [securityControl, setSecurityControl] = useState(hardcodedOptions.securityControl[0])
  const [companyPolicy, setCompanyPolicy] = useState(hardcodedOptions.companyPolicy[0])
  const [customerContract, setCustomerContract] = useState(hardcodedOptions.customerContracts[0])
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [notification, setNotification] = useState('')
  const [filterMode, setFilterMode] = useState('all')
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState(initialChatHistory)
  const [activeTab, setActiveTab] = useState('mapping')

  const handleCreateMapping = () => {
    setRequirements(hardcodedRequirements as Requirement[])
    setShowDashboard(true)
    setNotification('Mapping created successfully!')
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const filteredRequirements = filterMode === 'all'
    ? requirements
    : requirements.filter(req => 
        req.controlId === null || 
        req.policyId === null || 
        (req.customerRequirements && req.customerRequirements.some(cr => cr.status === 'non-compliant'))
      )

  const toggleFilter = () => {
    setFilterMode(filterMode === 'all' ? 'missing' : 'all')
  }

  const handleRowClick = (requirement: Requirement) => {
    setSelectedRequirement(requirement)
  }

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true)
  }

  const handleSendMessage = (message: string) => {
    const newUserMessage = { role: 'user', content: message }
    setChatHistory([...chatHistory, newUserMessage])
    
    // Simulate AI response (in a real application, this would call an API)
    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: `I'm sorry, but I don't have enough information to answer that question accurately. In a real implementation, I would analyze the compliance mapping data and provide a specific answer based on the latest information available.` }
      setChatHistory(prevHistory => [...prevHistory, aiResponse])
    }, 1000)
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8">
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="mb-4 sm:mb-0">Compliance Mapper</CardTitle>
          <Button onClick={handleUploadClick} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="regulation" className="text-sm font-medium">
                Regulation
              </label>
              <Select value={regulation} onValueChange={setRegulation}>
                <SelectTrigger id="regulation">
                  <SelectValue>{regulation}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.regulation.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="securityControl" className="text-sm font-medium">
                Security Control
              </label>
              <Select value={securityControl} onValueChange={setSecurityControl}>
                <SelectTrigger id="securityControl">
                  <SelectValue>{securityControl}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.securityControl.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="companyPolicy" className="text-sm font-medium">
                Company Policy
              </label>
              <Select value={companyPolicy} onValueChange={setCompanyPolicy}>
                <SelectTrigger id="companyPolicy">
                  <SelectValue>{companyPolicy}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.companyPolicy.map((option) => (
                    <SelectItem  key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="customerContract" className="text-sm font-medium">
                Customer Contract
              </label>
              <Select value={customerContract} onValueChange={setCustomerContract}>
                <SelectTrigger id="customerContract">
                  <SelectValue>{customerContract}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.customerContracts.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCreateMapping} className="w-full">
            Create Mapping
          </Button>
          {notification && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{notification}</span>
            </div>
          )}
          {showDashboard && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mapping">Mapping Results</TabsTrigger>
                <TabsTrigger value="chat">Compliance Assistant</TabsTrigger>
              </TabsList>
              <TabsContent value="mapping">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <h2 className="text-lg font-semibold mb-2 sm:mb-0">Mapping Results</h2>
                    <Button onClick={toggleFilter} variant="outline" className="w-full sm:w-auto">
                      {filterMode === 'all' ? 'Show Missing Coverage' : 'Show All Mappings'}
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Article</TableHead>
                          <TableHead>Sub-Article</TableHead>
                          <TableHead>Requirement Description</TableHead>
                          <TableHead>Control Category</TableHead>
                          <TableHead>CRI Profile</TableHead>
                          <TableHead>Security Policy ID</TableHead>
                          <TableHead>Mapping Confidence Interval</TableHead>
                          <TableHead>Customer Compliance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRequirements.map((req) => (
                            <TableRow key={req.article + req.subArticle} onClick={() => handleRowClick(req)} className="cursor-pointer hover:bg-gray-100">
                            <TableCell>{req.article}</TableCell>
                            <TableCell>{req.subArticle}</TableCell>
                            <TableCell>{req.regulationText}</TableCell>
                            <TableCell>{req.controlCategory}</TableCell>
                            <TableCell>{req.controlId || 'N/A'}</TableCell>
                            <TableCell>{req.policyId || 'N/A'}</TableCell>
                            <TableCell>{req.confidenceInterval ? `${req.confidenceInterval}%` : 'N/A'}</TableCell>
                            <TableCell>
                              
                              {req.customerRequirements && req.customerRequirements.some(cr => cr.status === 'non-compliant') ? (
                                <Badge className="bg-red-500">
                                  <AlertTriangle className="w-4 h-4 mr-1" />
                                  Non-Compliant
                                </Badge>
                              ) : (
                                <Badge className="bg-green-500">Compliant</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="chat">
                <ChatInterface chatHistory={chatHistory} onSendMessage={handleSendMessage} />
              </TabsContent>
            </Tabs>
          )}
          {selectedRequirement && (
            <DetailedView 
              requirement={selectedRequirement} 
              onClose={() => setSelectedRequirement(null)}
              regulation={regulation}
              securityControl={securityControl}
              companyPolicy={companyPolicy}
            />
          )}
        </CardContent>
      </Card>
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Select the type of content you want to upload or fetch.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => setIsUploadDialogOpen(false)}>Regulation URL</Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Security Control URL</Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Upload Company Policy</Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Upload Customer Contract</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
